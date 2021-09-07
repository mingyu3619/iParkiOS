/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import {View} from 'react-native';

const onAppleButtonPress = async () => {
  // Start the sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw 'Apple Sign-In failed - no identify token returned';
  }

  // Create a Firebase credential from the response
  const {identityToken, nonce} = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce,
  );

  // Sign the user in with the credential
  return auth().signInWithCredential(appleCredential);
};

const AppleSignIn = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <AppleButton
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.CONTINUE}
        onPress={() =>
          onAppleButtonPress().then(() =>
            console.log('Apple sign-in complete!'),
          )
        }
        style={{width: 300, height: 40}}
      />
    </View>
  );
};

export default AppleSignIn;
