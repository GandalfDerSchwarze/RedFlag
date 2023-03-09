package org.client;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;

public class Reader extends Thread {
    private Socket socket;
    private BufferedReader read;
    private String reading;
    private boolean closed;
    private String user;

    public Reader(Socket socket, String user) {
        this.socket = socket;
        this.closed = false;
        this.user = user;

        try {
            read = new BufferedReader(new InputStreamReader(this.socket.getInputStream()));
        } catch (IOException e) {
            System.err.println("Reader Error - cant create BufferedReader");
            e.printStackTrace();
        }
    }

    public void close() {
        try {
            closed = true;
            socket.close();
            read.close();
        } catch (IOException e) {
            System.out.println("Reader Error - closing error");
            e.printStackTrace();
        }
    }

    @Override
    public void run() {
        while (!closed) {
            try {
                reading = read.readLine();
            } catch (IOException e) {
                System.err.println("Reader Error - reading error");
                e.printStackTrace();
                break;
            }
            if (!reading.contains(user)) {
                System.out.println(reading);
            }
        }
    }
}