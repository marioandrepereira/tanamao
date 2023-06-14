package br.com.tanamao.client.actions;

import java.sql.Connection;
import java.util.Scanner;

import br.com.tanamao.database.postgre.managedb.Insert;

public class RegisterUser {

	private Scanner scanner;
	private String username, email, senha;
	
	public RegisterUser(Connection connection) {
		scanner = new Scanner(System.in);
		
		
		/*
		 * Informações da tabela user_auth
		 */
		System.out.print("Entre com o username: ");
		username = scanner.nextLine();
		System.out.print("Entre com o email: ");
		email = scanner.nextLine();
		System.out.print("Entre com a senha: ");
		senha = scanner.nextLine();
		
		/*
		 * Informações da tabela user_info
		 */
		
		//...
		
		new Insert(connection, username, email, senha);
	}
}
