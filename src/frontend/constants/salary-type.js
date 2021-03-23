const SPECIFIC_TYPE = { value: 0, label: "ตามระบุ" }
const RANGE_TYPE = { value: 1, label: "ตามช่วงระหว่าง" }
const STRUCTURAL_TYPE = { value: 2, label: "ตามโครงสร้างบริษัท" }
const REQUEST_TYPE = { value: 3, label: "ตามตกลง" }

const SALARY_TYPE_OPTION = [
  SPECIFIC_TYPE,
  RANGE_TYPE,
  STRUCTURAL_TYPE,
  REQUEST_TYPE
]

export {
  SPECIFIC_TYPE,
  RANGE_TYPE,
  STRUCTURAL_TYPE,
  REQUEST_TYPE,
  SALARY_TYPE_OPTION  
}