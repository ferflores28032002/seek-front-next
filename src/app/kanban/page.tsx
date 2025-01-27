import React from "react";

import { CustomKanban } from "@/components/CustomKanban";

/**
 * Page component that renders the CustomKanban component.
 * 
 * This component serves as the main entry point for the Kanban board page.
 * The Kanban board is used for task management, allowing users to visualize
 * and organize tasks in columns that represent different stages of the workflow.
 * 
 * @returns {JSX.Element} The rendered CustomKanban component.
 */
const Page = () => {
  return <CustomKanban />;
};

export default Page;
