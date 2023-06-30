import React from 'react'
import axios from 'axios'
const user_rest_api_url='http://localhost:8080/getAll';
class UserManagementService {
  getUsers()
  {
      return axios.get(user_rest_api_url);
  }
  deleteuser()
  {
    return axios.delete('http://localhost:8080/deleteUser');
  }
}
export default new UserManagementService();