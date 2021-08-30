import React from "react"
import { Card, Button, CardBody, CardFooter, CardHeader } from "reactstrap"
import "./index.css"

export default function CardResume({ text, fileURL }) {
  return (
    <Card className="card-resume">    
      <CardHeader>
      <div className="top-desc">Resume</div>
        <div className="title">ใบสมัครงานของฉัน 1</div>
      </CardHeader>  
      <CardBody>                
        
      </CardBody>
      <CardFooter>
      <Button color="primary" size="lg" block>Download</Button>
      </CardFooter>
    </Card>
  )
}