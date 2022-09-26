export const ATTRIBUTE_TYPE = {
    NOSE: 'NOSE',
    EYE: 'EYE',
    EAR: 'EAR',
    SHOULDER: 'SHOULDER',
    ELBOW: 'ELBOW',
    WRIST: 'WRIST',
    HIP: 'HIP',
    KNEE: 'KNEE',
    ANKLE: 'ANKLE',
  };

  export const ATTRIBUTE_CONNECTIONS = [
    ['nose'],
    ['leftEye','leftEar'],
    ['leftAnkle','leftKnee','leftHip','leftShoulder','leftElbow','leftWrist'],
    //['leftHip','leftKnee','leftAnkle'],
    ['rightEye','rightEar'],
    ['rightAnkle','rightKnee','rightHip','rightShoulder','rightElbow','rightWrist'],
    //['rightHip','rightKnee','rightAnkle']
  ];