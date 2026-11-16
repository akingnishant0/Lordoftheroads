"use client";

import React from "react";
import { LeadCRM } from "@/components/leads/LeadCRM";

export default function AgentLeadsPage() {
  return (
    <LeadCRM
      title="My Assigned Leads"
      subtitle="Your active pipeline, customer inquiries, and hot travel deals"
    />
  );
}
