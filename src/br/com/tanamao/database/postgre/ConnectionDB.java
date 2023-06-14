package br.com.tanamao.database.postgre;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionDB {
	
	private Connection connection = null;
	public Connection getConnection() {

		try {
		    String url = "jdbc:postgresql://localhost:5432/postgres";
		    String username = "postgres";
		    String password = "";
		    
		    connection = DriverManager.getConnection(url, username, password);

		    if (connection != null) {
		        System.out.println("Conexão com o banco de dados estabelecida com sucesso!");
		        // ou você pode exibir uma mensagem usando uma caixa de diálogo ou outra forma adequada para a sua aplicação
		    } else {
		        System.out.println("Falha ao conectar ao banco de dados.");
		    }

		    
		    // Faça operações no banco de dados aqui
		    
		} catch (SQLException e) {
		    System.out.println("Erro ao conectar ao banco de dados: " + e.getMessage());
		    e.printStackTrace();
		} finally {
		    if (connection != null) {
		    	/*
		        try {
		            connection.close();
		        } catch (SQLException e) {
		            e.printStackTrace();
		        }
		        */
		    }
		}
		return connection;
	}
}
