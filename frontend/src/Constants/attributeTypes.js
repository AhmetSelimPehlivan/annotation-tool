export const ATTRIBUTE_TYPE = {
    NOSE: 'NOSE',
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
    ['left_ankle','left_knee','left_hip','left_shoulder','left_elbow','left_wrist'],
    ['right_ankle','right_knee','right_hip','right_shoulder','right_elbow','right_wrist'],
  ];

  export const ATTRIBUTE_COLORS = [
    "#ffdb74",
    "#abbee6",
    "#f7453f"
  ];