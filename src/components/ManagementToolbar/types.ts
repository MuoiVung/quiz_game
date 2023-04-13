import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent } from "react";
import { OrderType, QuestionSortFieldType } from "../../api/QuestionsAPI/types";
import { UserSortFiedType } from "../../api/UsersAPI/types";

export type ManagementToolbarProps = {
  managementType: "question" | "user";
  onSelectMangementType: (event: SelectChangeEvent) => void;
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  listOrder: OrderType;
  onSelectOrder: (event: SelectChangeEvent) => void;
  questionSortField: QuestionSortFieldType;
  onSortQuestion: (event: SelectChangeEvent) => void;
  userSortField: UserSortFiedType;
  onSortUser: (event: SelectChangeEvent) => void;
  onOpenModal: () => void;
};
