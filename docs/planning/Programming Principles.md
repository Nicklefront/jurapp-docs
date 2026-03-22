GENERAL SCALABLE SOFTWARE ARCHITECTURE RULEBOOK

TIER 1: CORE LAWS (Non-Negotiable)
1. Single Responsibility
Every unit (class, function, module, service) has one reason to change.
If it can be explained with “and”, it must be split.
Complexity grows quadratically when responsibilities mix.
Law: One responsibility → one owner → one failure domain.

2. Separation of Concerns
Split system into clear layers with one-directional dependencies.
Inner layers contain rules, outer layers contain details.
Law: Business rules must not depend on technical details.

3. Dependency Inversion
High-level logic depends on abstractions, not implementations.
Details plug into rules, never the other way around.
Law: Control flows inward, dependencies flow outward.

4. Explicit Dependencies
All dependencies are visible, injected, and replaceable.
No hidden globals, no implicit construction.
Law: If you can’t see a dependency, you can’t control it.

TIER 2: ARCHITECTURAL STRUCTURE
5. Layered System Model
Interface → Application → Domain → Infrastructure

Interface: Delivery mechanisms (API, UI, CLI).
Application: Orchestration and workflows.
Domain: Business rules and invariants.
Infrastructure: Databases, APIs, IO, frameworks.
Rules
Inner layers never import outer layers.
Domain layer is framework-free.

6. Boundary Protection
Cross boundaries only through interfaces or DTOs.
Never leak internal models across boundaries.
Law: Boundaries exist to prevent accidental coupling.

TIER 3: DESIGN RULES
7. Composition Over Inheritance
Prefer assembling behavior over extending it.
Inheritance only when substitutability is guaranteed.
Law: Inheritance couples forever; composition couples intentionally.

8. Polymorphism for Variability
When behavior varies, isolate it behind an interface.
Select implementations via configuration, not conditionals.
Law: Conditionals grow; polymorphism scales.

9. Creation Is a Responsibility
Object creation logic belongs in factories or configuration.
Construction complexity must not leak into business logic.
Law: Creation is not free—centralize it.

10. Cross-Cutting Concerns Are Orthogonal
Logging, caching, validation, security must wrap behavior, not pollute it.
Law: Orthogonal concerns must remain orthogonal.

TIER 4: DATA & STATE MANAGEMENT
11. Aggregate Ownership
Each piece of mutable data has one authoritative owner.
Changes happen through that owner only.
Law: Shared mutable state is the root of most bugs.

12. Persistence Is an Implementation Detail
Business logic does not know how data is stored.
Storage concerns are isolated behind repositories or gateways.
Law: Data access is not business logic.

13. Transactions Belong to Use Cases
Define consistency boundaries at the workflow level.
Avoid transactional logic in low-level components.
Law: Transactions protect business invariants, not tables.

TIER 5: API & INTERFACE RULES
14. Stable Contracts, Unstable Internals
External interfaces change slowly.
Internal implementation changes freely.
Law: Consumers dictate stability requirements.

15. Explicit Input & Output Models
Never expose internal models directly.
Validate inputs at the boundary.
Law: Trust boundaries must be explicit.

16. Centralized Error Translation
Errors are handled once, mapped consistently.
Internal failures must not leak implementation details.
Law: Errors are part of the contract.

TIER 6: TESTING PHILOSOPHY
17. Test by Scope
Unit tests: logic in isolation.
Integration tests: real dependencies.
Contract tests: interface guarantees.
E2E tests: critical flows only.
Law: The wider the scope, the fewer the tests.

18. Determinism Over Coverage
Tests must be fast, repeatable, and deterministic.
Coverage is a lagging indicator, not a goal.
Law: A flaky test is worse than no test.

TIER 7: CONFIGURATION & SECURITY
19. Configuration Is External
No environment-specific values in code.
Code is immutable; configuration varies.
Law: Build once, deploy everywhere.

20. Secrets Are Never Code
Secrets live outside version control.
Exposure is treated as a breach, not a mistake.
Law: Assume every repo will leak someday.

TIER 8: OBSERVABILITY
21. Systems Must Explain Themselves
Logs tell what happened and why.
Metrics tell how often and how slow.
Traces tell where time was spent.
Law: If you can’t observe it, you can’t operate it.

22. Fail Loudly and Intentionally
Errors are logged with context.
Silent failure is forbidden.
Law: Hidden failures accumulate interest.

TIER 9: SCALABILITY & RESILIENCE
23. Protect External Dependencies
Assume external systems will fail.
Use timeouts, retries, circuit breakers, and fallbacks.
Law: Every network call is a potential failure.

24. Optimize for the Common Case
Cache read-heavy, stable data.
Defer or async long-running work.
Law: Performance problems are usually predictable.

25. Control Resource Usage
Rate-limit expensive operations.
Prevent one user or request from exhausting the system.
Law: Fairness protects availability.

TIER 10: DELIVERY & OPERATIONS
26. Automation Is Mandatory
Builds, tests, scans, and deployments are automated.
Manual steps are liabilities.
Law: What is manual will eventually fail.

27. Rollback Is a Feature
Every deployment must be reversible.
Recovery is more important than perfection.
Law: Failure is inevitable; recovery is optional only by negligence.

28. Health Is a First-Class Concern
Systems expose their readiness and liveness.
Broken systems remove themselves from traffic.
Law: A sick system must say so.

TIER 11: GOVERNANCE & ENFORCEMENT
29. Quality Gates Are Non-Negotiable
Code quality, tests, and security checks block delivery.
Exceptions are architectural debt and must be tracked.
Law: What you don’t enforce, you don’t value.

30. Size Limits Are Design Signals
Large classes or methods indicate missing abstractions.
Limits force clarity.
Law: Constraints create better designs.

META-PRINCIPLES (THE WHY)
Change is inevitable — structure determines cost
Coupling is the enemy, cohesion is the goal
Explicit beats implicit
Boundaries are more important than tools
Architecture exists to protect the business


