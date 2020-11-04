import React from 'react'
import styled from 'styled-components/native'

export default TextStyle = ({ ...props }) => {
    return <Text {...props}>{props.children}</Text>;
};

const Text = styled.Text`
    color: ${(props) => props.color ?? "#0f0f0f"};
    margin: ${(props) => props.margin ?? 0};
    padding: ${(props) => props.padding ?? 0};
    font-family: 'Georgia';

    ${({ title, huge, large, medium, small, tiny, big}) => {
        switch (true) {
            case huge:
                return `font-size: 72px;`;

            case title:
                return `font-size: 48px;`;

            case big:
                return `font-size: 32px;`;

            case large:
                return `font-size: 24px;`;

            case medium:
                return `font-size: 16px;`;

            case small:
                return `font-size: 13px;`;

            case tiny:
                return `font-size: 11px;`;

            default:
                return `font-size: 14px;`;
        }
    }}

    ${({ light, semi, bold, heavy }) => {
        switch (true) {
            case light:
                return `font-weight: 200;`;

            case semi:
                return `font-weight: 300;`;

            case bold:
                return `font-weight: 600;`;

            case heavy:
                return `font-weight: 700;`;

            default:
                return `font-weight: 400;`;
        }
    }}

    ${({ center, right }) => {
        switch (true) {
            case center:
                return `text-align: center;`;

            case right:
                return `text-align: right`;

            default:
                return `text-align: left`;
        }
    }}
`

