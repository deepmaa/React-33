import {
	FileUploadField,
	InputLabel,
	RadioInputField,
	SelectOptionField,
	TextAreaField,
	TextInputField,
} from "../../../components/form/input.component";
import { useForm } from "react-hook-form";
import { FormSubmitButton } from "../../../components/buttons/button.component";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import authSvc from "../auth.servive";
import { useState } from "react";
import { Modal, Button } from "flowbite-react";

export const RegisterPage = () => {

	const [otpModal, setOtpModal] = useState(false);

	const userRegisterDTO = Yup.object({
		name: Yup.string().min(2).max(25).required(),
		email: Yup.string().email().required("Email required"),
		password: Yup.string()
			.matches(
				/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,25}$/,
				{
					message:
						"Password should contain at least one character, a number and a special character.",
				}
			)
			.required(),
		confirmPassword: Yup.string().oneOf([Yup.ref("password")]).required(),
		gender: Yup.string().matches(/^(male|female|other)$/).required(),
		role: Yup.string().matches(/^(customer|seller)$/).required("Role required"),
		phone: Yup.string().matches(/^(?:\+977[- ]?)?(98\d{8}|97\d{8}|96\d{8}|0[1-6][- ]?\d{6,7})$/, { message: "Phone number should start with 98 or .." }).required(),
		address: Yup.string().nullable().optional().default(null),
		image: Yup.mixed().required("Image required"),
	});

	const [loading, setLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
		getValues,
	} = useForm({
		resolver: yupResolver(userRegisterDTO),
	});

	const submitEvent = async (data) => {
		try {
			console.log({data})
			setLoading(true);
			const result = await authSvc.registerUser(data);
			console.log(result.data.message);
			setOtpModal(true)
		} catch (exception) {
			setLoading(false);
			let errData = exception?.data?.data || null;
			if (errData) {
				Object.keys(errData).map((key) => {
					setError(key, { message: errData[key] });
				});
			}
			console.log(exception.data);
			
		}
	};

	return (
		<>
			<section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
					<a
						href="#"
						className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
					>
						<img
							className="w-8 h-8 mr-2"
							src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
							alt="logo"
						/>
						Flowbite
					</a>
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-2xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Registration Form
							</h1>
							<form
								onSubmit={handleSubmit(submitEvent)}
								className="space-y-4 md:space-y-6"
								action="#"
							>
								{/* Name */}
								<div>
									<InputLabel field={"name"} labelText={"Name"} />
									<TextInputField
										control={control}
										name={"name"}
										type="text"
										placeholder="Enter your name"
										errMsg={errors?.name?.message}
									/>
								</div>

								{/* Email */}
								<div>
									<InputLabel field={"name"} labelText={"Email"} />
									<TextInputField
										control={control}
										name={"email"}
										type="email"
										placeholder="Enter your email"
										errMsg={errors?.email?.message}
									/>
								</div>

								{/* Password */}
								<div>
									<InputLabel field={"password"} labelText={"Password"} />
									<TextInputField
										control={control}
										name={"password"}
										type="password"
										placeholder="Enter your password"
										errMsg={errors?.password?.message}
									/>
								</div>

								{/* Confirm Password */}
								<div>
									<InputLabel
										field={"confirmPassword"}
										labelText={"Confirm Password"}
									/>
									<TextInputField
										control={control}
										name={"confirmPassword"}
										type="password"
										placeholder="Re-enter your password"
										errMsg={errors?.confirmPassword?.message}
									/>
								</div>

								{/* Gender */}
								<div>
									<InputLabel field={"gender"} labelText={"Gender"} />
									<div className="flex gap-6">
										<RadioInputField
											options={[
												{ label: "Male", value: "male" },
												{ label: "Female", value: "female" },
												{ label: "Other", value: "other" },
											]}
											name="gender"
											control={control}
											errMsg={errors?.gender?.message}
										/>
									</div>
								</div>

								{/* Role */}
								<div>
									<InputLabel field={"role"} labelText={"Role"} />
									<SelectOptionField
										options={[
											{ label: "Buyer", value: "customer" },
											{ label: "Seller", value: "seller" },
										]}
										control={control}
										name={"role"}
										errMsg={errors?.role?.message}
									/>
								</div>

								{/* Phone */}
								<div>
									<InputLabel field={"phone"} labelText={"Phone"} />
									<TextInputField
										control={control}
										name={"phone"}
										type="text"
										placeholder="Re-enter your phone number"
										errMsg={errors?.phone?.message}
									/>
								</div>

								{/* Address */}
								<div>
									<InputLabel field={"address"} labelText={"Address"} />
									<TextAreaField
										name={"address"}
										control={control}
										errMsg={errors?.address?.message}
									/>
								</div>

								{/* Image Upload */}
								<div>
									<InputLabel field={"image"} labelTxt={"Image: "} />
									<FileUploadField
										setError={setError}
										control={control}
										name={"image"}
										errMsg={errors?.image?.message}
									/>
								</div>

								{/* Submit Button */}
								<FormSubmitButton loading={loading} />
							</form>
						</div>
					</div>
				</div>
			</section>

			<Modal show={otpModal} onClose={() => setOtpModal(false)}>
				<Modal.Header>Terms of Service</Modal.Header>
				<Modal.Body>
					<div className="space-y-6">
						<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
							With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
							companies around the world are updating their terms of service agreements to comply.
						</p>
						<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
							The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
							to ensure a common set of data rights in the European Union. It requires organizations to notify users as
							soon as possible of high-risk data breaches that could personally affect them.
						</p>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => setOtpModal(false)}>I accept</Button>
					<Button color="gray" onClick={() => setOtpModal(false)}>
						Decline
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
