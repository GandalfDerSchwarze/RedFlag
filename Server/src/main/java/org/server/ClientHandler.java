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
            System.out.println("Reading: " + reading);

            write.println("Testing...");
            write.flush();

            read.close();
            write.close();
            client.close();
        }catch (IOException e){
            System.err.println("Whoopsie something went wrong :(");
            e.printStackTrace();
        }
    }
}