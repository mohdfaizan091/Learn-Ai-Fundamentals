import fs from "fs";
import dotenv from "dotenv";
import Groq from "groq-sdk";
dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


async function multiTurnConversation() {
  // Initial conversation with system message and first user input
  const initialMessages = [
    {
      role: "system",
      content: "You are a helpful AI assistant that provides detailed explanations about complex topics. Always provide comprehensive answers with examples and context."
    },
    {
      role: "user",
      content: "What is quantum computing?"
    }
  ];

  // First request - creates cache for system message
  const firstResponse = await groq.chat.completions.create({
    messages: initialMessages,
    model: "openai/gpt-oss-120b"
  });

  console.log("First response:", firstResponse.choices[0].message.content);
  console.log("Usage:", firstResponse.usage);

  // Continue conversation - system message and previous context will be cached
  const conversationMessages = [
    ...initialMessages,
    firstResponse.choices[0].message,
    {
      role: "user",
      content: "Can you give me a simple example of how quantum superposition works?"
    }
  ];

  const secondResponse = await groq.chat.completions.create({
    messages: conversationMessages,
    model: "openai/gpt-oss-120b"
  });

  console.log("Second response:", secondResponse.choices[0].message.content);
  console.log("Usage:", secondResponse.usage);

  // Continue with third turn
  const thirdTurnMessages = [
    ...conversationMessages,
    secondResponse.choices[0].message,
    {
      role: "user",
      content: "How does this relate to quantum entanglement?"
    }
  ];

  const thirdResponse = await groq.chat.completions.create({
    messages: thirdTurnMessages,
    model: "openai/gpt-oss-120b"
  });

  console.log("Third response:", thirdResponse.choices[0].message.content);
  console.log("Usage:", thirdResponse.usage);
}

multiTurnConversation().catch(console.error);



 

// First response: ## Quantum Computing – A Comprehensive Overview

// ### 1. Why “Quantum” Matters
// Classical computers manipulate **bits** that can be either 0 or 1. Quantum computers use **quantum bits** (qubits) that obey the laws of quantum mechanics. Because of two central quantum phenomena—**superposition** and **entanglement**—a quantum processor can explore many computational states simultaneously, giving it a fundamentally different computational resource than a classical machine.

// ---

// ## 2. Core Quantum Concepts

// | Classical Concept | Quantum Counterpart | What It Gives the Computer |
// |-------------------|---------------------|----------------------------|
// | **Bit** (0 or 1) | **Qubit** – a two‑level quantum system (e.g., electron spin, photon polarization) | A qubit can be in a linear combination `α|0⟩ + β|1⟩` where `|α|² + |β|² = 1`. This is **superposition**. |
// | **Deterministic state** | **Superposition** | A single qubit simultaneously “contains” both 0 and 1, so an *n‑qubit* register can represent **2ⁿ** basis states at once. |
// | **Independent bits** | **Entanglement** | Correlations that cannot be described classically. Measuring one qubit instantly influences the state of its partner, no matter the distance. |
// | **Logic gates** | **Quantum gates** (unitary operations) | Gates such as **Hadamard (H), Pauli‑X, CNOT, Phase, T** manipulate amplitudes while preserving total probability. |
// | **Deterministic output** | **Probabilistic measurement** | After a computation, the quantum state collapses to a single classical outcome, with probabilities given by the squared amplitudes. Repeating the algorithm many times yields the correct answer with high confidence. |

// ### 2.1. Mathematics in a Nutshell
// A single qubit lives in a two‑dimensional complex vector space:

// \[
// |\psi\rangle = \alpha|0\rangle + \beta|1\rangle,\qquad \alpha,\beta\in\mathbb{C},\ |\alpha|^{2}+|\beta|^{2}=1.
// \]

// For *n* qubits the state is a vector in a **2ⁿ‑dimensional Hilbert space**:

// \[
// |\Psi\rangle = \sum_{i=0}^{2^{n}-1} c_i |i\rangle,
// \]

// where each `|i⟩` is a computational basis string (e.g., `|010⟩`) and the complex coefficients `c_i` encode the probability amplitudes.

// ---

// ## 3. Quantum Circuits – The Programming Model

// A quantum algorithm is expressed as a **circuit**: a sequence of quantum gates applied to qubits, ending with measurement(s).

// ```
// |0⟩ ──H───■───M
//            │
// |0⟩ ──────X───M
// ```

// *Example*: The circuit above creates a **Bell state** (maximally entangled pair) by first putting the first qubit in superposition (Hadamard) and then using a **CNOT** gate.

// ### 3.1. Common Quantum Gates

// | Gate | Symbol | Action on a Single Qubit | Matrix |
// |------|--------|--------------------------|--------|
// | **Pauli‑X** (NOT) | X | |0⟩ → |1⟩, |1⟩ → |0⟩ | `[[0,1],[1,0]]` |
// | **Hadamard** | H | |0⟩ → (|0⟩+|1⟩)/√2, |1⟩ → (|0⟩‑|1⟩)/√2 | `1/√2[[1,1],[1,-1]]` |
// | **Phase** | S | |1⟩ → i|1⟩ | `[[1,0],[0,i]]` |
// | **π/8 (T)** | T | |1⟩ → e^{iπ/4}|1⟩ | `[[1,0],[0,e^{iπ/4}]]` |
// | **CNOT** (control‑target) | – | Flips target if control = 1 | `[[1,0,0,0],[0,1,0,0],[0,0,0,1],[0,0,1,0]]` |

// These gates form a **universal set**: any unitary operation (hence any quantum algorithm) can be approximated arbitrarily well using only them.

// ---

// ## 4. Famous Quantum Algorithms

// | Algorithm | Problem Tackled | Quantum Speed‑up | Rough Idea |
// |-----------|----------------|------------------|------------|
// | **Shor’s algorithm** (1994) | Integer factorisation, discrete logarithms | Exponential (poly‑time vs. sub‑exponential classical) | Uses quantum Fourier transform (QFT) to find the period of a modular exponentiation function → derives factors. |
// | **Grover’s search** (1996) | Unstructured search of N items | Quadratic (O(√N) vs. O(N)) | Repeatedly inverts amplitudes about the mean, amplifying the marked item’s probability. |
// | **Quantum Phase Estimation** | Eigenvalue estimation of unitary operators | Core subroutine for many algorithms (including Shor) | Applies controlled‑U^2^k gates and an inverse QFT to extract phase bits. |
// | **Variational Quantum Eigensolver (VQE)** | Approximate ground‑state energies of molecules | Polynomial‑time for some chemistry problems (heuristic) | Hybrid quantum‑classical loop: quantum hardware prepares parametrized states, classical optimizer updates parameters to minimise energy. |
// | **Quantum Approximate Optimization Algorithm (QAOA)** | Approximate combinatorial optimisation (Max‑Cut, etc.) | Potentially better constants than classical heuristics | Alternates problem‑specific and mixing Hamiltonians, tuned variationally. |

// > **Takeaway:** Not every problem is faster on a quantum computer. Speed‑ups are provable only for a few specific tasks; many promising applications are still *heuristic*.

// ---

// ## 5. Physical Realisations of Qubits

// | Platform | Qubit Physical Implementation | Strengths | Current Challenges |
// |----------|------------------------------|-----------|--------------------|
// | **Superconducting circuits** | Josephson junctions → microwave resonators | Fast gate times (10‑100 ns), scalable lithography, strong industry backing (IBM, Google, Rigetti) | Cryogenic operation (~10 mK), relatively short coherence times (≈100 µs). |
// | **Trapped ions** | Hyperfine/optical states of ions in RF/optical traps | Excellent coherence (> seconds), high‑fidelity gates (>99.9 %) | Slower gates (µs‑ms), bulky vacuum & laser systems, limited connectivity (though photonic interconnects are being explored). |
// | **Photonic qubits** | Polarisation, time‑bin, or path encoding of single photons | Room‑temperature operation, natural for communication, low decoherence | Probabilistic two‑qubit gates, need for efficient single‑photon sources/detectors. |
// | **Spin‑qubits in semiconductors** | Electron or nuclear spin in quantum dots or donors | Compatibility with existing CMOS processes, potentially long coherence | Precise control of few‑electron devices, charge noise. |
// | **Topological qubits** (e.g., Majorana zero modes) | Non‑abelian anyons in engineered nanowires | Intrinsic error protection (fault tolerance) | Still experimental; no consensus demonstration of braiding yet. |

// ### 5.1. The Roadmap: NISQ → Fault‑Tolerant

// * **NISQ** (Noisy Intermediate‑Scale Quantum) era – 2020‑2025: 50‑200 noisy qubits, limited error correction, focus on hybrid algorithms like VQE/QAOA.
// * **Error‑corrected quantum computers** – beyond ~1,000 logical qubits (requiring millions of physical qubits with surface‑code error correction). Expected timeline is uncertain; most estimates place a practical, fault‑tolerant device in the 2030s‑2040s.

// ---

// ## 6. Example: Shor’s Algorithm in Action (High‑Level Walkthrough)

// 1. **Goal:** Factor N = 15 (a toy example). Classical best: trial division → O(√N)=≈4 operations; quantum algorithm demonstrates principle.
// 2. **Pick a random a** coprime to N (say a = 2). Compute the order *r* of a modulo N: smallest r such that aʳ ≡ 1 (mod N). For N = 15, a=2 → order r = 4.
// 3. **Quantum subroutine:** Use **Quantum Phase Estimation** on the unitary `U|x⟩ = |a·x mod N⟩`. This extracts a binary fraction approximating *k/r* for some integer *k*.
// 4. **Result:** Measurement yields a value close to 0.25 (since k=1, r=4). Classical post‑processing (continued fractions) recovers r = 4.
// 5. **Factor extraction:** Compute `gcd(a^{r/2} ± 1, N)`. Here `2^{2}=4`, `gcd(4‑1,15)=gcd(3,15)=3` and `gcd(4+1,15)=gcd(5,15)=5`. Both 3 and 5 are non‑trivial factors of 15.

// While this tiny instance can be done by hand, the algorithm scales polynomially (≈O((log N)³)) and would break RSA‑type cryptography for large N (2048‑bit numbers) if a sufficiently large fault‑tolerant quantum computer existed.

// ---

// ## 7. Potential Applications Beyond Cryptography

// | Domain | Quantum‑enhanced Task | Current Status |
// |--------|----------------------|----------------|
// | **Chemistry & Materials** | Compute electronic structure, reaction rates, strongly correlated materials | VQE and quantum Monte‑Carlo experiments on 10‑50 qubit devices (e.g., H₂, LiH). Industry pilots (IBM, Google, Rigetti, Cambridge Quantum). |
// | **Optimization & Logistics** | Solve combinatorial problems (vehicle routing, portfolio optimisation) faster or with better heuristics | QAOA demonstrated on small instances; real‑world advantage not yet proven. |
// | **Machine Learning** | Quantum kernel methods, quantum data encoding, generative models (QCBM) | Proof‑of‑concept on 5‑20 qubit systems; hybrid classical‑quantum training loops. |
// | **Finance** | Monte Carlo simulation with quantum amplitude estimation → quadratic speed‑up | Early prototypes; need error‑corrected hardware for practical gains. |
// | **Sensing & Metrology** | Quantum sensors exploit entanglement for enhanced precision (e.g., atomic clocks, gravitational wave detection) | Already commercial (e.g., atomic interferometers); quantum computing techniques help design optimal sensing protocols. |
// | **Fundamental Physics** | Simulating lattice gauge theories, high‑energy particle dynamics | Small‑scale simulations performed; long‑term goal is to study regimes beyond classical supercomputers. |

// ---

// ## 8. Key Challenges to Overcome

// 1. **Decoherence & Noise** – Interaction with the environment destroys quantum information. Requires:
//    * Improved materials & fabrication.
//    * Better isolation and cryogenic engineering.
// 2. **Error Correction Overhead** – Surface‑code error correction needs ~1,000 physical qubits per logical qubit at ~1 % error rates. Scaling to millions of qubits is a massive engineering problem.
// 3. **Control Electronics** – Fast, low‑noise microwave/laser control, multiplexed readout, and classical‑quantum interface bandwidth.
// 4. **Algorithm‑Hardware Co‑Design** – Many promising algorithms assume fault‑tolerance; adapting them for NISQ devices is an active research area.
// 5. **Software Stack** – Compilers, optimisers, and simulators that translate high‑level code (Qiskit, Cirq, Braket, tket) into hardware‑native pulses while minimising errors.

// ---

// ## 9. A Simple Analogy (Classical‑to‑Quantum)

// > **Think of a classical library** where you have to read every book one by one to find a particular piece of information – O(N) work.  
// > **A quantum library** lets you *place a wave* that simultaneously “visits” every book, then interferes constructively on the correct one and destructively elsewhere. By measuring the wave you have a good chance of picking the right book in only √N steps (Grover) or even in log‑scale steps for special structured problems (Shor).

// The analogy captures the *parallelism* (superposition) and the *interference* (algorithmic shaping of amplitudes) that make quantum speed‑ups possible.

// ---

// ## 10. Getting Started (If You Want to Experiment)

// | Step | Resources |
// |------|-----------|
// | **Learn the basics** | *Quantum Computation and Quantum Information* by Nielsen & Chuang (the “bible”). Intro videos: MIT’s 8.370 (Quantum Information Science) or IBM’s Qiskit textbook. |
// | **Play with simulators** | IBM Quantum Experience (free cloud access), Google Cirq, Microsoft Q#. They provide a web‑based interface and a Python SDK. |
// | **Write your first circuit** (e.g., Bell
// Usage: {
//   queue_time: 0.260227838,
//   prompt_tokens: 102,
//   prompt_time: 0.004021036,
//   completion_tokens: 3072,
//   completion_time: 6.416183871,
//   total_tokens: 3174,
//   total_time: 6.4202049070000005,
//   completion_tokens_details: { reasoning_tokens: 123 }
// }
// Second response: ## A Tiny, Hands‑On Illustration of Quantum Superposition  

// Below we build the **simplest possible quantum system—a single qubit**—and show how a single quantum gate puts it into a superposition of “0” and “1”.  

// ---

// ### 1. The Classical Analogy  

// | Classical bit | Possible states |
// |---------------|-----------------|
// | **0** or **1** | Exactly one of the two values at any time. |

// If you flip a **fair coin** and look at it *after* it lands, you will see either **heads** (0) **or** **tails** (1).  
// Before you look, you can *talk* about a 50 % chance of each outcome, but the coin itself is still either heads or tails—it just isn’t revealed yet.

// ---

// ### 2. What a Qubit Does Differently  

// A **qubit** can genuinely be in *both* states *at the same time* (in a precise quantum‑mechanical sense). Its mathematical description is

// \[
// |\psi\rangle = \alpha|0\rangle + \beta|1\rangle ,
// \qquad \text{with } |\alpha|^{2}+|\beta|^{2}=1 .
// \]

// - `|0⟩` and `|1⟩` are the two basis states (the analogues of heads/tails).  
// - `α` and `β` are **complex amplitudes**.  
// - The **probability** of finally observing `0` is `|α|²`; the probability of `1` is `|β|²`.

// When `α = β = 1/√2`, the qubit is in an **equal superposition**:

// \[
// |\psi\rangle = \frac{1}{\sqrt{2}}|0\rangle + \frac{1}{\sqrt{2}}|1\rangle .
// \]

// If you now measure the qubit, you get `0` **half the time** and `1` **half the time**, *but* the qubit *really* lived in a combination of both possibilities until the measurement forced it to “choose”.

// ---

// ### 3. Creating the Superposition with a Single Gate  

// The most common way to generate the equal superposition is to apply a **Hadamard gate (H)** to an initially‑prepared `|0⟩` qubit.

// | Step | Circuit Symbol | Action on the State |
// |------|----------------|---------------------|
// | 1. Initialise | `|0⟩` | The qubit starts in `|0⟩`. |
// | 2. Apply H   | `H`  | `|0⟩ → (|0⟩ + |1⟩)/√2`. |
// | 3. Measure   | `M`  | Collapses to `0` with 50 % probability, `1` with 50 % probability. |

// Visually:

// ```
// |0⟩ ──H───M
// ```

// The **Hadamard** is the quantum analogue of “throwing a perfectly balanced coin” **and** keeping the quantum “both‑sides‑up” information *alive* until you decide to look.

// ---

// ### 4. Running It on a Real (or Simulated) Quantum Processor  

// Below is a **minimal Qiskit** program (Python) that does exactly the steps above, runs the circuit many times, and prints the observed frequencies.

// ```python
// # -------------------------------------------------
// #  Simple superposition demo using IBM Qiskit
// # -------------------------------------------------
// from qiskit import QuantumCircuit, Aer, execute
// from qiskit.visualization import plot_histogram
// import matplotlib.pyplot as plt

// # 1. Build a 1‑qubit circuit
// qc = QuantumCircuit(1, 1)   # 1 quantum bit, 1 classical bit

// # 2. Put the qubit into superposition
// qc.h(0)                     # Hadamard gate on qubit 0

// # 3. Measure
// qc.measure(0, 0)           # store result in classical bit 0

// # 4. Simulate (use the ideal statevector simulator for perfect gates)
// sim = Aer.get_backend('qasm_simulator')
// result = execute(qc, sim, shots=1024).result()
// counts = result.get_counts()

// print("Measurement outcomes (out of 1024 shots):")
// print(counts)               # e.g., {'0': 511, '1': 513}

// # 5. Optional: visualise
// plot_histogram(counts)
// plt.title('Superposition → measurement')
// plt.show()
// ```

// **What you should see**

// Running the script (or the same circuit on IBM’s free cloud quantum devices) will give a histogram close to:

// ```
// {'0': ~512, '1': ~512}
// ```

// —roughly a 50 % / 50 % split, confirming that the qubit truly occupied an **equal superposition** before measurement.

// ---

// ### 5. Why Superposition Is *More* Than “Just a Probability”

// In a classical probabilistic system you could *pretend* the coin is “both heads and tails with 50 % each”, but the underlying reality is still one definite outcome hidden from you.  

// In quantum mechanics, **interference** lets those amplitudes combine or cancel when you apply further gates.  
// For instance, if you apply a second Hadamard (`H`) **after** the first, you get:

// \[
// H\left(\frac{|0\rangle+|1\rangle}{\sqrt{2}}\right)
//    = \frac{1}{\sqrt{2}} \bigl( H|0\rangle + H|1\rangle \bigr)
//    = \frac{1}{\sqrt{2}} \bigl( \tfrac{|0\rangle+|1\rangle}{\sqrt{2}} + \tfrac{|0\rangle-|1\rangle}{\sqrt{2}} \bigr)
//    = |0\rangle .
// \]

// The two “paths” (`|0⟩` and `|1⟩`) **interfere** constructively for `|0⟩` and destructively for `|1⟩`, restoring the original `|0⟩` state with **certainty**. This ability to make amplitudes add or subtract is the engine behind all quantum algorithmic speed‑ups.

// ---

// ### 6. A Physical Picture (Double‑Slit Analogy)

// - **Classical particle**: If you send a single marble through a double slit, it goes through *one* slit; you see a single bright spot on a screen.
// - **Quantum particle (e.g., electron, photon)**: When the same particle is sent one‑by‑one, an **interference pattern** gradually builds up. Each particle behaved *as if* it passed through **both slits simultaneously** and the two “paths” interfered.

// The **state** of the particle after the slits is a superposition of “went through left slit” **and** “went through right slit”. Only when you place a detector *at the slits* do you force the particle to pick a single path, destroying the interference.

// A qubit’s superposition is the same mathematical idea, just abstracted to the two logical states `|0⟩` and `|1⟩`.

// ---

// ### 7. TL;DR Summary  

// 1. **Superposition** means a qubit can be written as `α|0⟩ + β|1⟩`.  
// 2. The **Hadamard gate** turns a definite `|0⟩` into the equal superposition `( |0⟩ + |1⟩ ) / √2`.  
// 3. Measuring the qubit yields `0` or `1` with probabilities `|α|²` and `|β|²`. In the equal case both are 50 %.  
// 4. Because amplitudes can **interfere**, superposition is a *resource* that classical randomness alone cannot emulate.  

// Feel free to copy the short Qiskit program, run it, and watch the 50/50 histogram appear—your first hands‑on glimpse of quantum superposition!
// Usage: {
//   queue_time: 0.283907014,
//   prompt_tokens: 3195,
//   prompt_time: 0.156925553,
//   completion_tokens: 1847,
//   completion_time: 3.890471785,
//   total_tokens: 5042,
//   total_time: 4.047397338,
//   completion_tokens_details: { reasoning_tokens: 80 }
// }
