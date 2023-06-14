package br.com.tanamao.database.postgre.managedb;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;


public class Insert {
	
	String tbl_user_auth = "INSERT INTO user_auth (username, email, senha) VALUES (?, ?, ?)";
	
	public Insert(Connection connection, String username, String email, String senha) {
		
		PreparedStatement statement = null;

		try {
		    statement = connection.prepareStatement(tbl_user_auth);
		    statement.setString(1, username); // valor para o parâmetro username
		    statement.setString(2, email); // valor para o parâmetro email
		    statement.setString(3, senha); // valor para o parâmetro senha

		    statement.executeUpdate();
		} catch (SQLException e) {
		    e.printStackTrace();
		} finally {
		    if (statement != null) {
		        try {
		            statement.close();
		        } catch (SQLException e) {
		            e.printStackTrace();
		        }
		    }
		}
	}
}
