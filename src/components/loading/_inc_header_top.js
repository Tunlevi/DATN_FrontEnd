import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

const IncLoadingTopHeader = (props) => (
    <ContentLoader primaryColor="#e8f7ff"
                   secondaryColor="#4dadf7"
                   duration={700}
                   height={50}>
        <Rect x="0" y="0" rx="4" ry="4" width="250" height="10"/>
        <Rect x="0" y="13" rx="4" ry="3" width="250" height="10"/>
        <Rect x="0" y="25" rx="3" ry="3" width="250" height="10"/>
        <Rect x="300" y="0" rx="5" ry="5" width="35" height="35"/>
    </ContentLoader>
)

export default IncLoadingTopHeader;
