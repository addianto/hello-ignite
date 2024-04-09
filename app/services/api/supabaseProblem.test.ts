import { getSupabaseProblem } from "./supabaseProblem";

describe("Supabase Problem Tests", () => {
  it("should correctly identify connection errors", () => {
    const error = { code: "PGRST001", message: "", details: "", hint: "" }
    const problem = getSupabaseProblem(error);
    
    expect(problem.kind).toBe("connection")
  })

  it("should correctly identify API request errors", () => {
    const error = { code: "PGRST101", message: "", details: "", hint: "" }
    const problem = getSupabaseProblem(error);

    expect(problem.kind).toBe("api request")
  })

  it("should correctly identify schema cache errors", () => {
    const error = { code: "PGRST201", message: "", details: "", hint: "" }
    const problem = getSupabaseProblem(error);

    expect(problem.kind).toBe("schema cache")
  })

  it("should correctly identify JWT errors", () => {
    const error = { code: "PGRST301", message: "", details: "", hint: "" }
    const problem = getSupabaseProblem(error);

    expect(problem.kind).toBe("jwt")
  })

  it("should correctly identify internal errors", () => {
    const error = { code: "PGRSTX01", message: "", details: "", hint: "" }
    const problem = getSupabaseProblem(error);

    expect(problem.kind).toBe("internal")
  })
})
