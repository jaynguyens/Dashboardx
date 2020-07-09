import { createContext } from "react"

const SelectionContext = createContext({
	selection: [],
	setSelection: () => {},
})
export default SelectionContext
