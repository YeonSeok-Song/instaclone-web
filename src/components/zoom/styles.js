//index.js에 스타일 컴포넌트가 너무 많기 때문에
//이런식으로 폴더를 만든 뒤 styles.js 파일을 만들어 정리한다.
//코드 분리
import { CloseOutlined } from '@ant-design/icons';
import styled, {createGlobalStyle} from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Overlay = styled.div`
    position : fixed;
    z-index: 5000;
    top: 0;
    left: 0;
    right : 0;
    bottom : 0;
    background: rgba(105, 105, 105, .4);
    @media(max-height : 675px) {
        overflow-y : scroll;
    }
    
`;

//태그드 탬플릿 리터럴

//스타일드 컴포넌트는 바벨설정이 필수다.
export const ZoomWrapper = styled.div`
    display: flex;
    align-items : center;
    justify-content : center;
    width : 100%;
    height : 100%;
    @media(max-height : 675px) {
        margin-top : 38px;
        height : 600px;
        margin-bottom : 38px;
    }
    
`
export const Header = styled.header`
    height : 44px;
    background : white;
    position: relative;
    padding: 0;
    text-align: center;

    & h1 {
        margin: 0;
        font-size: 17px;
        color: #333;
        line-height: 44px;

    }

    & button {
        position : absolute;
        right: 10px;
        top: 0;
        padding : 15px;
        line-height: 14px;
        cursor: pointer;
    }
`;
export const ZoomCommentContainer = styled.div`
    background : white;
    height : 545px;
    width: 330px;
    @media(max-width : 930px) {
        display : none;
    }
    
`
export const SlickWrapper = styled.div`
    width: 600px;
    @media(max-width : 930px) {
        width: 70%;
    }
`;
//& 선택자

export const ImgWrapper = styled.div`
    height : 545px;
    background : black;
    & img {
        width : 100%;
        height : 100%;
        object-fit: contain;
    }
`;

export const Indicator = styled.div`
    text-align: center;

    & > div {
        width: 75px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        background: #313131;
        display: inline-block;
        text-align: center;
        color: white;
        font-size: 15px;
    }
`;
//라이브러리로 정해진 클래스네임도 이렇게 변경 가능
//absolute로 버튼을 만들었는데 클릭이 안되면 z-index를 설정해주기
//z-index : 0 은 안됨 1부터 설정하기
export const Global = createGlobalStyle`
    .slick-slide {
        display: inline-block;
    }
    .ant-card-cover { 
        transform: none !important;
    }
    .slick-dots li.slick-active button:before{
        opacity: .75;
        color: white;
    }
    .slick-dots li button:before{
        font-family: 'slick';
        font-size: 6px;
        line-height: 20px;

        position: absolute;
        top: 0;
        left: 0;

        width: 20px;
        height: 20px;

        content: '•';
        text-align: center;

        opacity: .25;
        color: white;

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .slick-prev,
    .slick-next
    {
        font-size: 0;
        line-height: 0;

        position: absolute;
        top: 50%;

        display: block;

        width: 20px;
        height: 20px;
        padding: 0;
        -webkit-transform: translate(0, -50%);
        -ms-transform: translate(0, -50%);
        transform: translate(0, -50%);
    
        cursor: pointer;

        color: transparent;
        border: none;
        outline: none;
        background: transparent;
    }
    .slick-prev{
        left: 5%;
        z-index : 1;

    }
    .slick-next{
        left: 95%;
    }

`;

export const CloseBtn = styled(CloseOutlined)`
    position: absolute;
    right: 0;
    top : 0;
    padding: 15px;
    line-height: 14px;
    cursor: pointer;
    color : white;
    font-size : 30px;
    margin : 10px;
`;

//fixed안에 transform 넣으면 생기는 버그
//화살표와 dots의 css 변경하기

/*
    @media(max-width : 735px) {
        width : 300px;
        height : 200px;
    }
    */