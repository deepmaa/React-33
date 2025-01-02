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
import { toast } from "react-toastify";
import { OTPModal } from "../../../components/otp-modal/otp-modal.component";
import { Link } from "react-router-dom";

export const RegisterPage = () => {

	const [otpModal, setOtpModal] = useState(false);

	const userRegisterDTO = Yup.object({
		fullName: Yup.string().min(2, 'Enter your name').max(25),
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
		passwordConfirmation: Yup.string().oneOf([Yup.ref("password")]).required(),
		gender: Yup.string().matches(/^(male|female|other)$/).required(),
		role: Yup.string().matches(/^(customer|seller)$/).required("Role required"),
		telephone: Yup.string().matches(/^(?:\+977[- ]?)?(98\d{8}|97\d{8}|96\d{8}|0[1-6][- ]?\d{6,7})$/, { message: "Phone number should start with 98 or .." }).required(),
		address: Yup.string().nullable().optional().default(null),
		profileImage: Yup.mixed().required("Image required"),
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
			toast.success("Your account has been created. Please use the OTP code provided on your email");
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
					<Link
						to="/"
						className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
					>
						<img
							className="w-8 h-8 mr-2"
							src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
							alt="logo"
						/>
						Flowbite
					</Link>
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
										name={"fullName"}
										type="text"
										placeholder="Enter your name"
										errMsg={errors?.fullName?.message}
									/>
								</div>

								{/* Email */}
								<div>
									<InputLabel field={"email"} labelText={"Email"} />
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
										field={"passwordConfirmation"}
										labelText={"Confirm Password"}
									/>
									<TextInputField
										control={control}
										name={"passwordConfirmation"}
										type="password"
										placeholder="Re-enter your password"
										errMsg={errors?.passwordConfirmation?.message}
									/>
								</div>

								{/* Gender */}
								<div>
									<InputLabel field={"gender"} labelText={"Gender"} />
									<div className="flex gap-6 capitalize">
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
									<InputLabel field={"telephone"} labelText={"Phone"} />
									<TextInputField
										control={control}
										name={"telephone"}
										type="text"
										placeholder="Re-enter your phone number"
										errMsg={errors?.telephone?.message}
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
									<InputLabel field={"profileImage"} labelTxt={"Image: "} />
									<FileUploadField
										setError={setError}
										control={control}
										name={"profileImage"}
										errMsg={errors?.profileImage?.message}
									/>
								</div>

								{/* Submit Button */}
								<FormSubmitButton loading={loading} />
							</form>
						</div>
					</div>
				</div>
			</section>

			<OTPModal 
				otpModal={otpModal}
				email={getValues('email')}
				setOtpModal={setOtpModal}
			/>
		</>
	);
};
