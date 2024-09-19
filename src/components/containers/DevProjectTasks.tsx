import {ChecklistGrid} from "../presenters/ChecklistGrid/ChecklistGrid";
import {checklistGridData} from "../../models/fakeData";
import React from "react";

export const DevProjectTasks: React.FC = () => {
	return <ChecklistGrid title={'Dev Project'} data={checklistGridData.data} />
}
