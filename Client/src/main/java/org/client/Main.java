package org.client;

import java.io.*;
import java.net.Socket;

public class Main {
    private static final String ip = "127.0.0.1";
    private static final int port = 8080;

    public static void main(String[] args) {
        Socket socket = null;
        PrintWriter write = null;
        BufferedReader read = null;

        String writing = null;
        String reading = null;

        try{
            socket = new Socket(ip, port);

            read = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            write = new PrintWriter(new OutputStreamWriter(socket.getOutputStream()));

            System.out.println("Input Message: ");
            writing = Input.readString();

            write.println(writing);
            write.flush();

            reading = read.readLine();

            System.out.println("Writing to Server: " + writing);
            System.out.println("Reading from Server: " + reading);

            read.close();
            write.close();
            socket.close();
        }catch (IOException e){
            System.err.println("Hoppala sollte nicht passieren");
            e.printStackTrace();
        }
    }
}