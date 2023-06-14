package br.com.tanamao;

import br.com.tanamao.client.Client;
import br.com.tanamao.database.postgre.ConnectionDB;

public class Main {

	public static void main(String[] args) {
		ConnectionDB connection = new ConnectionDB();
		new Client(connection.getConnection());
	}
}
