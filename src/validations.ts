import { existsSync } from "fs";
import { MessageError } from "./constants";

export const validateTargetFolder = (target_folder: string) => {
	if (!existsSync(target_folder)) {
		return { error: MessageError.DIRECTORY_NOT_EXIST, status: false };
	}

	return { status: true };
};
