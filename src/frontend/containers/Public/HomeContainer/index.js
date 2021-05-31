import React from "react"
import { Container } from "reactstrap"
import Template from "Frontend/components/Template"
import SectionCover from "./SectionCover"
import SectionCategory from "./SectionCategory"
import SectionRecentJob from "./SectionRecentJob"

function HomeContainer() {
  return (
    <Template>
      <SectionCover />
      <Container>
        <SectionCategory />
        <SectionRecentJob />
      </Container>
    </Template>
  );
}
export default HomeContainer;

