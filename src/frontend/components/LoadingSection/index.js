import React from "react";
import { Spinner } from "reactstrap"
import Section from "Frontend/components/Section";

export default function LoadingSection() {
  return (
    <Section>
      <div className="text-center">
        <Spinner />
      </div>
    </Section>
  );
}
