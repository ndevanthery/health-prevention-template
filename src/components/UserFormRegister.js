import {useState} from "react";
import '../Stylesheets/App.css'

export default function UserFormRegister({handleSubmit, submitButtonLabel}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);

    return (
        <form
            onSubmit={(e) => {
                handleSubmit(e, firstName, lastName, email, password);
            }}
        >
            <div className="divUserForm">
                <input
                    type="text"
                    placeholder="Firstname"
                    value={firstName}
                    className="firstNameFormInput"
                    onChange={handleFirstNameChange}
                    required
                />
            </div>
            <div className="divUserForm">
                <input
                    type="text"
                    placeholder="Lastname"
                    value={lastName}
                    className="lastNameFormInput"
                    onChange={handleLastNameChange}
                    required
                />
            </div>
            <div className="divUserForm">
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    className="emailFormInput"
                    onChange={handleEmailChange}
                    required
                />
            </div>
            <div className="divUserForm">
                <input
                    type="password"
                    placeholder="Password"
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
