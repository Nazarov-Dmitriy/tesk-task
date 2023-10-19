export default interface IData {
    city: string,
    workshop: string[],
    employees: employees[],
}

interface employees {
    name: string,  workshop: number
}