package org.client;

import java.io.*;
import java.net.Socket;

public class Main {
    private static final String ip = "127.0.0.1";
    private static final int port = 8080;

    private static Socket socket = null;
    private static PrintWriter write = null;
    private static BufferedReader read = null;

    private static String writing = null;
    private static String reading = null;
    private static int newPort;

    private static Reader reader = null;
    private static Writer writer = null;

    private static String user = null;

    public static void main(String[] args) {
        initialise();
        loop();
    }

    private static void initialise(){
        System.out.println("Username:");
        user = Input.readString();

        try {
            socket = new Socket(ip, port);

            read = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            write = new PrintWriter(new OutputStreamWriter(socket.getOutputStream()));

            System.out.println("Chat Port:");//If port does not exist new ServerSocket is created (capped)
            writing = Input.readString();
            write.println(writing);
            write.flush();

            reading = read.readLine();
            if (!reading.equals("Success")) {
                System.err.println("Server Error");
                throw new RuntimeException();
            }

            reading = read.readLine();
            newPort = Integer.parseInt(reading);

            socket.close();
            read.close();
            write.close();

            socket = new Socket(ip, newPort);
            reader = new Reader(socket, user);
            writer = new Writer(socket, user);
            System.out.println("Connected on Port: " + newPort);
        }catch (IOException e) {
            System.err.println("Client Initialise Error");
            e.printStackTrace();
        }
    }

    private static void loop(){
        reader.start();

        try{
            do{
                System.out.println("Chat Message: ");
                writing = Input.readString();
                writer.write(writing);

                System.out.println("Sent: " + writing);
            }while(!writing.equals("exit"));

            reader.close();
            writer.close();
            socket.close();
        }catch (IOException e){
            System.err.println("Hoppala sollte nicht passieren");
            e.printStackTrace();
        }
    }
}