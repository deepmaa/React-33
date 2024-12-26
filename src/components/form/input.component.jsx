import { useController } from "react-hook-form";

export const InputLabel = ({ field, labelText }) => {
	return (
		<>
			<label
				htmlFor={field}
				className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>
				{labelText}
			</label>
		</>
	);
};

export const TextInputField = ({
	control,
	type = "text",
	name,
	defaultValue = "",
	errMsg = null,
	sussMsg = null,
	placeholder = ""
}) => {
	const { field } = useController({
		control: control,
		name: name,
		defaultValue: defaultValue,
		// rules: {
		// 	required: true
		// }
	});

	return (
		<>
			<input
				type={type}
				{...field}
				className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
				placeholder={placeholder}
			/>

			{errMsg ? (
				<>
					<div className="text-red-500 text-xs pt-2">{errMsg}</div>
				</>
			) : (
				<></>
			)}
		</>
	);
};

export const RadioInputField = ({ options, name, control, errMsg = null }) => {
	const {
		field: { onChange, value },
	} = useController({
		control: control,
		name: name,
	});

	return (
		<>
			{options.map((option, index) => (
				<div key={index} className="flex items-center gap-2">
					<input
						id={option.value}
						type="radio"
						value={option.value}
						name={name}
						onChange={(e) => {
							if (e.target.checked) {
								onChange(option.value);
							}
						}}
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					/>
					<label
						htmlFor={option.value}
						className="text-sm font-medium text-gray-900 dark:text-white"
					>
						{option.value}
					</label>
				</div>
			))}

			{errMsg ? (
				<>
					<div className="text-red-500 text-xs">{errMsg}</div>
				</>
			) : (
				<></>
			)}
		</>
	);
};

export const SelectOptionField = ({
	options,
	name,
	control,
	errMsg = null,
}) => {
	const { field } = useController({
		control: control,
		name: name,
	});
	return (
		<>
			<select
				id={name}
				{...field}
				className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
			>
				<option value="">Select Any one</option>
				{options.map((option, index) => (
					<option key={index} value={option.value}>
						{option.label}
					</option>
				))}
			</select>

			{errMsg ? (
				<>
					<div className="text-red-500 text-xs pt-2">{errMsg}</div>
				</>
			) : (
				<></>
			)}
		</>
	);
};

export const TextAreaField = ({ control, name, errMsg = null }) => {
	const { field } = useController({
		control: control,
		name: name,
	});
	return (
		<>
			<textarea
				id={name}
				{...field}
				rows={3}
				className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 resize-none"
				placeholder="Your address"
			></textarea>

			{errMsg ? (
				<>
					<div className="text-red-500 text-xs pt-2">{errMsg}</div>
				</>
			) : (
				<></>
			)}
		</>
	);
};

export const FileUploadField = ({
	control,
	name,
	errMsg = null,
	isMultiple = false,
	setError = null,
}) => {
	const {
		field: { onChange, value },
	} = useController({
		control: control,
		name: name,
	});

	console.log(value);
	return (
		<>
			<div className="flex">
				<div className={`pe-4 ${isMultiple ? "w-full" : "w-3/4"}`}>
					<input
						onChange={(e) => {
							if (isMultiple) {
								onChange(Object.values(e.target.files));
							} else {
								let image = e.target.files["0"];
								let ext = image.name.split(".").pop(); //
								if (
									!["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"].includes(
										ext
									)
								) {
									setError(name, { message: "Image format Invalid" });
								} else if (image.size > 1 * 1024 * 1024) {
									setError(name, {
										message: "File size should be less than or equal to 2MB",
									});
								} else {
									onChange(image);
								}
							}
						}}
						multiple={isMultiple}
						className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 focus:outline-none"
						id={name}
						type="file"
						accept="image/*"
					/>
				</div>
				<div className={`${isMultiple ? "w-full" : "w-1/4"}`}>
					{Array.isArray(value) ? (
						<div className="flex">
							{value.map((img, index) => (
								<div key={index} className="flex">
									<img
										className="w-full"
										src={URL.createObjectURL(img)}
										alt=""
									/>
								</div>
							))}
						</div>
					) : (
						<>
							<img src={value ? URL.createObjectURL(value) : ""} alt="" />
						</>
					)}
				</div>
			</div>

			{errMsg ? (
				<>
					<div className="text-red-500 text-xs pt-2">{errMsg}</div>
				</>
			) : (
				<></>
			)}
		</>
	);
};