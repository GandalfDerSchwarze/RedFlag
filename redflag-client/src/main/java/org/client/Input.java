package org.client;

import java.io.*;

public class Input {
    private static InputStream is = System.in;
    private static BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(is));

    public static String readString(){
        if (System.in != is) {
            is = System.in;
            bufferedReader = new BufferedReader(new InputStreamReader(is));
        }
        try {
            return bufferedReader.readLine();
        } catch (IOException e) {
            System.err.println("This should not have happened - Carl is on it");
            e.printStackTrace();
            return "CAAAARRRLLLL it is not working";
        }
    }
}