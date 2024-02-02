import { useContext } from "react"
import AppContext from "../Context/AppContext"
import { checkLevel } from "./permission"


export function useLevels() {
    const {employee} = useContext(AppContext)

    const levels = {
        admin: checkLevel(employee, 'admin'),
        superAdmin: checkLevel(employee, 'superAdmin'),
       
        operationEmployee: checkLevel(employee, 'operationEmployee'),
        cs: checkLevel(employee, 'cs'),
        cx: checkLevel(employee, 'cx'),
        executive: checkLevel(employee, 'executive'),
        marketing: checkLevel(employee, 'marketing'),
        initialEmployee: checkLevel(employee, 'employee')
    }

    return levels
}
