import {
  GridCallbackDetails,
  GridColDef,
  GridPaginationModel,
  GridRowsProp,
} from "@mui/x-data-grid";
import { SetStateAction } from "react";
import { OrderType, QuestionSortFieldType } from "../../api/QuestionsAPI/types";
import { UserRoleType, UserSortFiedType } from "../../api/UsersAPI/types";

export type MangementType = "user" | "question";

export type PaginationModelType = {
  page: number;
  pageSize: number;
};

export type DataTableProps = {
  columns: GridColDef[];
  rows: GridRowsProp;
  rowCount: number;
  paginationOptions?: number[];
  paginationModel: GridPaginationModel;
  onPaginationModelChange: (
    model: GridPaginationModel,
    details: GridCallbackDetails
  ) => void;
  loading: boolean;
};

export type GeneralDataTableProps<T> = {
  paginationModel: PaginationModelType;
  searchKeyWord: string;
  listOrder: OrderType;
  sortField: T;
  setPaginationModel: (value: SetStateAction<PaginationModelType>) => void;
  onCloseAddModal: () => void;
  isAddModalOpen: boolean;
  editModalState: {
    open: boolean;
    id: number;
  };
  onOpenEditModal: (id: number) => void;
  onCloseEditModal: () => void;
};

// QUESTION MANAGEMENT TYPE

export type QuestionRowType = {
  id: number;
  seq: number;
  title: string;
  createdDay: string;
  thumbnail: string;
};

export type EditQuestionFormType = {
  title: string;
  thumbnailLink?: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  answerCorrect: {
    answer1: boolean;
    answer2: boolean;
    answer3: boolean;
    answer4: boolean;
  };
};

export type AddQuestionFormType = {
  title: string;
  thumbnailLink?: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  answerCorrect: {
    answer1: boolean;
    answer2: boolean;
    answer3: boolean;
    answer4: boolean;
  };
};

export type BasicModalProps = {
  isOpen: boolean;
  onCloseModal: () => void;
};

export type EditQuestionModalProps = {
  isOpen: boolean;
  onCloseModal: () => void;
  questionId: number;
};

export type QuestionModalType = "edit" | "add";

export enum CORRECT_ANSWER {
  ANSWER_1 = 1,
  ANSWER_2,
  ANSWER_3,
  ANSWER_4,
}

export type QuestionDataTableProps =
  GeneralDataTableProps<QuestionSortFieldType>;

//  USER MANAGEMENT TYPE
export type UserDataTableProps = GeneralDataTableProps<UserSortFiedType>;

export type UserRowType = {
  id: number;
  seq: number;
  name: string;
  email: string;
  roles: string;
  createdDay: string;
  avatar: string;
};

export type AddUserFormType = {
  email: string;
  name: string;
  password: string;
  roles: UserRoleType[];
};

export type EditUserModalProps = {
  isOpen: boolean;
  onCloseModal: () => void;
  userId: number;
};

export type EditUserFormType = {
  email: string;
  name: string;
  roles: UserRoleType[];
};
