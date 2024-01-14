import {
	Layout, Row, Col, Space, Form, Input, Button, message,
} from "antd";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom"
import axios from "axios"
const useStyles = createUseStyles({
	loginWrapper: {
		width: "100%",
		height: "50vh",
		// minWidth: "23vw",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		background: "#FFFFFF",
		borderRadius: "0.8em",
		border: "1px solid #F0F0F0",
		boxShadow: "0 0.2em 1em 0 rgba(0, 0, 0, 0.1), 0 1em 2.3em 0 rgba(0, 0, 0, 0.1)",
	},


	template: {
		width: "30em",
	},
	hello: {
		fontSize: "1.8em",
		fontWeight: "bold",
	},
	loginLogoText: {
		fontSize: "1.8em",
		fontWeight: "bold",
		color: "rgb(0, 85, 0, .7)",
		marginBottom: "1em",
	},
	content: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	section: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		backgroundImage: "radial-gradient(#FFFFFF, #DDE4F1)",
	},
	footer: {
		backgroundColor: "transparent",
		display: "flex",
		justifyContent: "center",
	},
});

const { Content } = Layout;

export default function Login() {
	const classes = useStyles();

	const navigate = useNavigate();
	const handleNavigateHome = () => {
		navigate('/Home')
	}
	const onFinish = async (values) => {
		try {
			console.log('Logging values:', values);

			const response = await axios.post('http://103.166.182.247:3001/users/login', {
				email: values.email,
				password: values.password
			});

			console.log(response.data);


			const user = response.data.data.user;

			// Check if the user's role is 'admin'
			if (user.role === 'admin') {
				const { id, fullName } = user;
				const { accessToken } = response.data.data;

				// Save fullName and accessToken to local storage
				localStorage.setItem('fullName', fullName);
				localStorage.setItem('UserID', id);
				localStorage.setItem('accessToken', accessToken);

				// Authentication successful
				message.success('Login successful!');

				// Navigate to the home page
				handleNavigateHome();
			} else {
				// User's role is not 'admin'
				message.error('Login failed. You do not have permission to access the admin panel.');
			}
		
	} catch (error) {
		console.error('Login error:', error);
		message.error('Login failed. Please try again later.');
	}
};
return (
	<div style={{ width: "100%", height: "100vh" }}>
		<Layout className={classes.section}>
			<Content className={classes.content}>
				<Row gutter={[{ xs: 0, sm: 0, lg: 140 }, 0]}>

					<Col xs={24} sm={24} lg={12}>
						<div className={classes.loginWrapper} style={{ maxWidth: "500px", minWidth: "350px" }}>
							<Space direction="vertical" style={{ minWidth: "80%" }}>
								<Space direction="vertical">
									<div className={classes.hello}>Hello, Welcome to</div>
									<Space className={classes.loginLogoText}>
										Admin
									</Space>
								</Space>

								<Form
									name="loginForm"
									onFinish={onFinish}
									layout="vertical"

								>
									<Form.Item
										label="Email"
										name="email"
										rules={[
											{
												required: true,
												message: "Tên ngươi dung không được để trông",
											},
										]}
									>
										<Input />
									</Form.Item>

									<Form.Item
										label="Password"
										name="password"
										rules={[
											{
												required: true,
												message: "mật khẩu không thể để trống",
											},
										]}
									>
										<Input.Password />
									</Form.Item>

									<Form.Item>
										<Button
											block
											type="primary"
											htmlType="submit"
										>
											Login
										</Button>
									</Form.Item>

								</Form>
							</Space>
						</div>
					</Col>
				</Row>
			</Content>

		</Layout>
	</div>
);
}
