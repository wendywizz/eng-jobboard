import React from "react"
import { Pagination, PaginationItem, PaginationLink } from "reactstrap"
import _ from "lodash"

export default function PaginationResult({ pageLink, displayPerPage = 10, pageLength = 5, totalItems = 0, currentPage = 0 }) {
  const renderItems = () => {
    //const totalPage = Math.ceil(totalItems / displayPerPage)

    return _.range(currentPage, pageLength).map((item, index) => {
      
        return (<PaginationItem key={index} >
          <PaginationLink href={pageLink + "?page=" + (index + 1)}>{index + 1}</PaginationLink>
        </PaginationItem>)
      
    })
  }
  return (
    <Pagination>
      <PaginationItem>
        <PaginationLink first href={pageLink + "?page=1"} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink previous href="#" />
      </PaginationItem>
      { renderItems()}
      <PaginationItem>
        <PaginationLink next href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink last href="#" />
      </PaginationItem>
    </Pagination>
  )
}