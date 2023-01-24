import { toBoolean, toDate, toLowerCase, trim } from "./cast.helper"

toLowerCase

describe('Cast Helper Test', () => {
  it("Should return the characater in lower case", () => {
    const result = toLowerCase("TEST")
    expect(result).toEqual("test")
  })

  it("Should remove the not necessary white-space ", () => {
    const result = trim("          test        ")
    expect(result).toEqual("test")
  })

  it("Should return the characater in lower case", () => {
    const result = toDate("2022-12-24T20:55:04.138Z")
    expect(result instanceof Date).toEqual(true)
  })

  it("Should remove the not necessary white-space ", () => {
    const result = toBoolean('true')
    expect(typeof(result)).toEqual('boolean')
  })
})