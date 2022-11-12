export const ATTRIBUTE_TYPE = {
    NOSE: 'NOSE',
    /*EYE: 'EYE',
    EAR: 'EAR',*/
    SHOULDER: 'SHOULDER',
    ELBOW: 'ELBOW',
    WRIST: 'WRIST',
    HIP: 'HIP',
    KNEE: 'KNEE',
    ANKLE: 'ANKLE',
  };

  export const ATTRIBUTE_KEYPOINTS = [
    'nose',
    'left_ankle',
    'left_knee',
    'left_hip',
    'left_shoulder',
    'left_elbow',
    'left_wrist',
    'right_ankle',
    'right_knee',
    'right_hip',
    'right_shoulder',
    'right_elbow',
    'right_wrist'
  ]

  export const ATTRIBUTE_CONNECTIONS = [
    ['nose'],
    //['leftEye','leftEar'],
    ['left_ankle','left_knee','left_hip','left_shoulder','left_elbow','left_wrist'],
    //['leftHip','leftKnee','leftAnkle'],
    //['rightEye','rightEar'],
    ['right_ankle','right_knee','right_hip','right_shoulder','right_elbow','right_wrist'],
    //['rightHip','rightKnee','rightAnkle']
  ];

  export const ATTRIBUTE_COLORS = [
    "#ffdb74",
    "#abbee6",
    "#f7453f"
  ];