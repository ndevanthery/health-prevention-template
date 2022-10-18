import { useState } from "react";

export default function QuestionForm({ handleSubmit, submitButtonLabel }) {
    const [questionGroup, setQuestionGroup] = useState("");
    const [questionText, setQuestionText] = useState("");
    const [availability, setAvailability] = useState(true);

    const handleQuestionGroupChange = (e) => setQuestionGroup(e.target.value);
    const handleQuestionTextChange = (e) => setQuestionText(e.target.value);
    const handleAvailabilityChange = (e) => setAvailability(e.target.value);

    return (
        <form
            onSubmit={(e) => {
                handleSubmit(e, questionText, availability);
            }}
        >
            <input
                type="text"
                placeholder="Write the group here"
                value={questionGroup}
                onChange={handleQuestionGroupChange}
                required
            />
            <br />

            <input
                type="text"
                placeholder="Write the question here"
                value={questionText}
                onChange={handleQuestionTextChange}
                required
            />
            <br />

            {/*<input*/}
            {/*    type="boolean"*/}
            {/*    // placeholder="availability"*/}
            {/*    value=true*/}
            {/*    onChange={handleAvailabilityChange}*/}
            {/*    required*/}
            {/*/>*/}
            <br />
            <button type="submit">{submitButtonLabel}</button>
        </form>
    );
}