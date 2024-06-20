import { StatusCode } from "@/common/interfaces/StatusCode";

export type UseCaseOutput<T> = {
	isSuccess: true;
	status: StatusCode;
	data: T;
} | {
	isSuccess: false;
	status: StatusCode;
	message: string;
}