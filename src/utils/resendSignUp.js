import { Auth } from 'aws-amplify';

function resendSignUp(username) {
	return Auth.resendSignUp(username).then(() => {
    console.log('code resent successfully');
    return 'SUCCESS';
	}).catch(e => {
    console.log(e);
    return e;
	});
}

export default resendSignUp
