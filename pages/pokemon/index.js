import { connect } from "react-redux";
import { ServerSideProps, Template } from "../../application/templates/index";

export const getServerSideProps = ServerSideProps;
export default connect()(Template);
