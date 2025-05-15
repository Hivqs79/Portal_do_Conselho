/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Box, FormControlLabel, Modal, Radio, RadioGroup, Typography } from "@mui/material";
import Icon from "../Icon";
import { IoClose } from "react-icons/io5";
import { useThemeContext } from "@/hooks/useTheme";
import FeedbackStudent from "@/interfaces/feedback/FeedbackStudent";
import FeedbackUser from "@/interfaces/feedback/FeedbackUser";
import AvaliationInputs from "../council/AvaliationInputs";
import TableHeader from "../table/TableHeader";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import FeedbackClass from "@/interfaces/feedback/FeedbackClass";

interface FeedbackModalProps {
	open: boolean;
	close: () => void;
	feedback: FeedbackStudent | FeedbackUser | null;
	headersClass: TableHeaderContent[];
	feedbackClass?: FeedbackClass | null;
	headers: TableHeaderContent[];
	satisfied: boolean | null;
	setSatisfied?: (value: boolean) => void;
}

export default function FeedbackModal({
	open,
	close,
	feedback,
	feedbackClass,
	headersClass,
	headers,
	satisfied,
	setSatisfied
}: FeedbackModalProps) {
	const { backgroundColor, redDanger, colorByModeSecondary, colorByMode } = useThemeContext();

	return (
		<Modal
			open={open}
			onClose={() => {
				close();
			}}
			className="flex items-center justify-center"
		>
			<Box
				className={`py-2 px-4 z-50 mx-4 sm:mx-16 mt-24 w-full rounded-big max-w-[1000px]`}
				style={{ backgroundColor: backgroundColor }}
			>
				<Box className="flex flex-col w-full max-h-[80vh] overflow-y-auto p-2 sm:p-4 gap-10">
					<Box className="flex items-center flex-row w-full">
						<Box className="flex flex-col w-full mr-4">
							<Typography variant="xl_text_bold" color={colorByModeSecondary}>
								Detalhes do pré-conselho
							</Typography>
						</Box>
						<Box className="flex w-fit h-fit gap-1">
							<Box
								onClick={() => { close(); }}
							>
								<Icon
									IconPassed={IoClose}
									color={redDanger}
									className="size-10"
								/>
							</Box>
						</Box>
					</Box>
					<Box className="flex flex-col">
						<table className="w-full rounded-t-2xl overflow-hidden">
							<TableHeader
								variant={"pre-council"}
								headers={headers}
								headerButtons={{}}
							/>
						</table>
						<AvaliationInputs
							readOnly={true}
							copyButton={true}
							Positivecontent={feedback?.strengths}
							Negativecontent={feedback?.toImprove}
						/>
					</Box>
					{feedbackClass &&
						<Box className="flex flex-col">
							<table className="w-full rounded-t-2xl overflow-hidden">
								<TableHeader
									variant={"pre-council"}
									headers={headersClass}
									headerButtons={{}}
								/>
							</table>
							<AvaliationInputs
								readOnly={true}
								copyButton={true}
								Positivecontent={feedbackClass.strengths}
								Negativecontent={feedbackClass.toImprove}
							/>
						</Box>
					}
					<Box>
						<RadioGroup value={satisfied} onChange={(e) => setSatisfied && setSatisfied(e.target.value === "true")}>
							<FormControlLabel
								value={true}
								control={
									<Radio
										className="!ml-2"
									/>
								}
								label={
									<Typography className="!ml-2" variant="md_text_regular" color={colorByMode}>
										Li e estou <Typography variant="md_text_bold" color={colorByMode}>
											satisfeito
										</Typography> com o feedback recebido.
									</Typography>
								}
							/>
							<FormControlLabel
								value={false}
								control={
									<Radio
										className="!ml-2"
									/>
								}
								className="!mr-2"
								label={
									<Typography className="!ml-2" variant="md_text_regular" color={colorByMode}>
										Li e estou <Typography variant="md_text_bold" color={colorByMode}>
											insatisfeito
										</Typography> com o feedback recebido.
									</Typography>
								}
							/>
						</RadioGroup>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
}