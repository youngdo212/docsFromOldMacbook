var invertTree = function(root) {
  if(root === null) return null;
  const [invertedLeft, invertedRight] = [invertTree(root.left), invertTree(root.right)];
  ([root.left, root.right] = [invertedRight, invertedLeft]);
  return root;
};