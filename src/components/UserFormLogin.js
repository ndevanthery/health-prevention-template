import {useState} from "react";
import '../Stylesheets/App.css'

export default function UserFormLogin({handleSubmit, submitButtonLabel}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    return (
        <form
            onSubmit={(e) => {
                handleSubmit(e, email, password);
            }}
        >
            <div className="divUserForm">
                <h5>Email</h5>
                <input
                    type="text"
                    placeholder="email@hes.ch"
                    value={email}
                    className="emailFormInput"
                    onChange={handleEmailChange}
                    required
                />
            </div>
            <div className="divUserForm">
                <h5>Password</h5>
                <input
                    type="password"
                    placeholder="********"
                    value={password}
                    className="passwordFormInput"
                    onChange={handlePasswordChange}
                    required
                />
            </div>
            <button className="buttonSubmitForm" type="submit">{submitButtonLabel}</button>
        </form>
    );
}
