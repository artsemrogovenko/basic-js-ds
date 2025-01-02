const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.tree = null;
  }

  searchPlace(node,value){
    if(node.data!==null){
      if (value > node.data) {
        if (node.right===null){
          node.right= new Node(value);
          return;
        }
        this.searchPlace(node.right, value);
      }
      if (value < node.data) {
        if (node.left===null){
          node.left= new Node(value);
          return;
        }
        this.searchPlace(node.left, value);
      }
    }
  }

  root() {
      return this.tree;
  }

  add(data) {
    if(this.tree===null){
      this.tree=new Node(data);
      return;
    }

    this.searchPlace(this.tree,data);
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    const seek=(node,searchValue)=>{
      if(node===null){
        return null;
      }
      if (node.data===searchValue){
        return node;
      }
        let leftResult = seek(node.left,searchValue);
        if(leftResult!==null){
          return leftResult;
        }
        let rightResult = seek(node.right,searchValue);
        return rightResult;
    }

   return seek(this.tree,data);
  }

  remove(data) {
    const rebuilding=(node,searchValue)=> {
      if (node === null) {
        return null;
      }
      if(node.data>searchValue){
        node.left=rebuilding(node.left, searchValue);
        return node;
      }
      if(node.data<searchValue){
        node.right= rebuilding(node.right, searchValue);
        return node;
      }

      if (node.left===null && node.right===null){
        return null;
      }

      if(node.left===null && node.right!==null){
        return node.right;
      }
      if(node.left!==null && node.right===null){
        return node.left;
      }

      let result = node.right;
      while (result.left !== null) {
        result = result.left;
      }

      node.data = result.data;

      node.right = rebuilding(node.right, result.data);
      return node;
    }
    rebuilding(this.tree, data);
}

  min() {
    let min = this.tree.data;
    const seekMin = (node)=>{
      while(node!==null) {
        if(node.left===null) {
          min = node.data;
          return min;
        }
        return seekMin(node.left);
      };
    }
    seekMin(this.tree);
    return min;
  }

  max() {
    let max = this.tree.data;
    const seekMax = (node)=>{
      while(node!==null) {
        if(node.right===null) {
          max = node.data;
          return max;
        }
        return seekMax(node.right);
      };
    }
    seekMax(this.tree);
    return max;
  }
}

module.exports = {
  BinarySearchTree
};
