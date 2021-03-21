function inorderTraversal (root) {
    if (!root) {
        return 
    }
    const res = [];
    const inorder = (root) => {
        if (!root) {
            return
        }
        res.push(root.val)
        inorder(root.left);
        inorder(root.right);
    }
    inorder(root)
    return res;
}   