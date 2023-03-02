package org.server;

import java.io.*;
import java.net.Socket;

public class ClientHandler implements Runnable{
    private Socket client;

    BufferedReader read;
    PrintWriter write;

    public ClientHandler(Socket client){
        this.client = client;
    }

    @Override
    public void run() {
        try{
            read = new BufferedReader(new InputStreamReader(client.getInputStream()));
            write = new PrintWriter(new OutputStreamWriter(client.getOutputStream()));

            String reading = read.readLine();
            String writing = "Testing...";

            System.out.println("[SERVER]:Reading from Client: " + reading);

            write.println(writing);
            write.flush();

            System.out.println("[SERVER]:Writing to Client: " + writing);

            read.close();
            write.close();
            client.close();
        }catch (IOException e){
            System.err.println("Whoopsie something went wrong :(");
            e.printStackTrace();
        }
    }
}