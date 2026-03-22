// GitHub Releases API fetch + platform detection + button rendering

const PLATFORM_MAP = {
  ".exe":      { name: "Windows", icon: "windows" },
  ".msi":      { name: "Windows", icon: "windows" },
  ".dmg":      { name: "macOS",   icon: "macos" },
  ".pkg":      { name: "macOS",   icon: "macos" },
  ".AppImage": { name: "Linux",   icon: "linux" },
  ".deb":      { name: "Linux",   icon: "linux" },
  ".rpm":      { name: "Linux",   icon: "linux" },
  ".tar.gz":   { name: "Linux",   icon: "linux" },
};

function detectPlatform(filename) {
  // Check longest extensions first (.tar.gz before .gz)
  const sorted = Object.keys(PLATFORM_MAP).sort((a, b) => b.length - a.length);
  for (const ext of sorted) {
    if (filename.toLowerCase().endsWith(ext.toLowerCase())) {
      return PLATFORM_MAP[ext];
    }
  }
  return { name: "Download", icon: "unknown" };
}

function formatSize(bytes) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(1) + " " + units[i];
}

async function fetchLatestRelease() {
  const container = document.getElementById("download-buttons");
  const versionEl = document.getElementById("release-version");
  const errorEl = document.getElementById("error-message");

  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/releases/latest`
    );

    if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);

    const release = await res.json();

    // Display version
    if (versionEl && release.tag_name) {
      versionEl.textContent = release.tag_name;
    }

    // Filter out source archives
    const assets = (release.assets || []).filter(
      (a) => !a.name.endsWith(".zip") || !a.name.includes("source")
    );

    if (assets.length === 0) {
      container.innerHTML = `<p class="no-assets">No downloadable assets found in the latest release.</p>`;
      return;
    }

    container.innerHTML = "";

    assets.forEach((asset) => {
      const platform = detectPlatform(asset.name);
      const btn = document.createElement("a");
      btn.href = asset.browser_download_url;
      btn.className = "download-btn";
      btn.setAttribute("download", "");

      btn.innerHTML = `
        <span class="btn-icon">${PLATFORM_ICONS[platform.icon]}</span>
        <span class="btn-text">
          <span class="btn-platform">${platform.name}</span>
          <span class="btn-meta">${asset.name} · ${formatSize(asset.size)}</span>
        </span>
      `;

      container.appendChild(btn);
    });
  } catch (err) {
    console.error("Failed to fetch release:", err);
    if (errorEl) {
      errorEl.textContent =
        "Could not load releases. Check your config or try again later.";
      errorEl.style.display = "block";
    }
  }
}

// Run on load
document.addEventListener("DOMContentLoaded", fetchLatestRelease);
