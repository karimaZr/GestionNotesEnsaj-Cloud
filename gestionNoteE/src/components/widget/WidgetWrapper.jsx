import React from "react";
import Widget from "./Widget";
import ModuleWidget from "./StudentModulesWidget";

const WidgetWrapper = ({ type, studentId }) => {
    if (type === "student") {
        return <ModuleWidget studentId={studentId} />;
    }
    return <Widget type={type} />;
};

export default WidgetWrapper;
