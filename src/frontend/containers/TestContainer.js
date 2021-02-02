import React from 'react'
import { Button } from "reactstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Template from '../components/Template';

function TestContainer() {
  return (
    <Template>
      <h1>Hello</h1>
      <Button size="lg" color="primary"><FontAwesomeIcon icon={["fal", "coffee"]} /> Hello</Button>
    </Template>
  )
}
export default TestContainer